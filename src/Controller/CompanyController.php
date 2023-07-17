<?php

namespace App\Controller;

use App\Entity\Company;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\HttpFoundation\Request;

class CompanyController extends AbstractController
{

    #[Route('/companies', name: 'app_companies', methods: ['GET'])]
    public function getCompanies(EntityManagerInterface $em, SerializerInterface $serializer): JsonResponse
    {
        $repository = $em->getRepository(Company::class);
        $companies = $repository->findAll();
        $json = $serializer->serialize($companies, JsonEncoder::FORMAT, ['json_encode_options' => JSON_UNESCAPED_UNICODE]);

        return new JsonResponse($json, 200, [], true);
    }

    #[Route('/companies/create', name: 'app_companies_create', methods: ['POST'])]
    public function create(EntityManagerInterface $entityManager): JsonResponse
    {
        $json = ['success' => false];

        try{
            $testNum = mt_rand(6, 9);
            $company = new Company();
            $company->setName('Test Company ' . $testNum);
            $company->setRegistrationCode(mt_rand(103341878, 903341878));
            $company->setAddress("Test address " . $testNum);
            $company->setCreatedAt(new \DateTimeImmutable());
            $entityManager->persist($company);
            $entityManager->flush();
            $json = ['success' => true];
        }catch(Exception $e){

        }

        return new JsonResponse($json);
    }

    #[Route('/companies/{id}/delete', name: 'app_companies_delete', methods: ['POST'])]
    public function delete(EntityManagerInterface $entityManager, int $id): JsonResponse
    {
        $json = ['success' => false];

        $company = $entityManager->getRepository(Company::class)->find($id);

        if ($company) {
            $entityManager->remove($company);
            $entityManager->flush();
            $json = ['success' => true];
        } 

        return new JsonResponse($json);
    }

    #[Route('/companies/{id}/show', name: 'app_companies_show', methods: ['POST'])]
    public function show(EntityManagerInterface $entityManager, int $id): JsonResponse
    {
        $json = ['success' => false];

        $company = $entityManager->getRepository(Company::class)->find($id);

        if ($company) {
            $html = $this->renderView('company/show.html.twig', [
                'company' => $company,
            ]);
            
            $json = [
                'success' => true, 
                'html' => $html
            ];
        } 

        return new JsonResponse($json);
    }

    #[Route('/companies/{id}/edit', name: 'app_companies_edit', methods: ['POST'])]
    public function edit(EntityManagerInterface $entityManager, int $id): JsonResponse
    {
        $json = ['success' => false];

        $company = $entityManager->getRepository(Company::class)->find($id);

        if ($company) {
            
            $html = $this->renderView('company/edit.html.twig', [
                'company' => $company,
            ]);
            
            $json = [
                'success' => true, 
                'html' => $html
            ];
        } 

        return new JsonResponse($json);
    }

    #[Route('/companies/{id}/update', name: 'app_companies_update', methods: ['POST'])]
    public function update(Request $request, EntityManagerInterface $entityManager, int $id): JsonResponse
    {
        $json = ['success' => false];

        $company = $entityManager->getRepository(Company::class)->find($id);

        if ($company) {
            $params = $request->request->all();
            $company->setName($params['name']);
            $company->setRegistrationCode($params['registrationCode']);
            $company->setVat($params['vat']);
            $company->setAddress($params['address']);
            $company->setPhone($params['phone']);
            $entityManager->flush();
            
            $json = [
                'success' => true, 
            ];
        } 

        return new JsonResponse($json);
    }
}
